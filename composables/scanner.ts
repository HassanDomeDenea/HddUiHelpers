import axios from 'axios';
import HddScannerLunchModal from 'HddUiHelpers/components/HddScannerLunchModal.vue';
import moment from 'moment';
import { useDialog } from 'primevue';
import { safeTry } from '../utils/safeTry.ts';

export const useScanner = function () {
  const scannerPort = window._HDD_SCANNER_PORT ?? 40101;
  const dialog = useDialog();
  const scannerBaseUrl = `http://localhost:${scannerPort}/api/`;
  const scannerAxiosInstance = axios.create({
    baseURL: scannerBaseUrl,
    withCredentials: false,
  });
  const scannerSchemeUrl = 'hddscanner://';
  async function checkServer(retries: number = 0): Promise<boolean> {
    const [response, error] = await safeTry(() =>
      scannerAxiosInstance.get('check', {
        timeout: 100,
      }),
    );
    if (error) {
      if (retries < 1) {
        window.location.href = scannerSchemeUrl + 'start';
        await new Promise((resolve) => setTimeout(resolve, 5000));
        return await checkServer(1);
      }
      return false;
    }
    return response.data.success;
  }

  function openHddScannerLunchModal() {
    dialog.open(HddScannerLunchModal, {
      props: {
        header: 'HDD Scanner',
        style: {
          minWidth: '50vw',
        },
        modal: true,
        dismissableMask: true,
      },
    });
  }

  async function scanWithDialog(): Promise<FileList | undefined> {
    const isConnected = await checkServer();
    if (!isConnected) {
      openHddScannerLunchModal();
      return;
    }

    const [response] = await safeTry(() => scannerAxiosInstance.get('start-scanning'));
    if (response && response.data.success) {
      // images is a list of base64 encoded strings
      const base64List = response.data.images as string[];

      let cnt = 0;
      const attemptDate = moment().format('YYYYMMDDHHMMSS');
      const blobs = base64List.map((base64) => {
        cnt++;
        return base64ToFile(base64, `ScannedImage_${attemptDate}_${cnt}.png`);
      });
      const dt = new DataTransfer();
      blobs.forEach((blob) => {
        dt.items.add(blob);
      });
      return dt.files;
    }
    return;
  }
  return {
    scanWithDialog,
  };
};

function base64ToFile(base64String: string, fileName: string, mimeType: string = 'image/png') {
  // Add missing padding if necessary
  const padded = base64String.padEnd(base64String.length + ((4 - (base64String.length % 4)) % 4), '=');

  // Decode base64 to binary string
  const byteString = atob(padded);

  // Convert binary string to Uint8Array
  const byteArray = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    byteArray[i] = byteString.charCodeAt(i);
  }

  // Create File (works in browser)
  return new File([byteArray], fileName, { type: mimeType });
}

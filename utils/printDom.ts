import moment from 'moment';

const MM_TO_PX = 3.78;
const IN_TO_PX = 96;

interface PrintDomWithStylesOptions {
    inlineStyles?: boolean;
    paperSize?: string;
    paperMargin?: string | number;
    bodyTopMargin?: string | number;
    backgroundImage?: string;
    successCallback?: () => void;
    documentTitle?: () => void;
    pageCounter?: boolean;
    showPrintTime?: boolean;
    themeClassName?: string;
    firstPageHeaderImageUrl?: string,
    headerImageUrl?: string;
    /** Header max width in mm*/
    headerMaxWidth?: number;
    /** Header max height in mm*/
    headerMaxHeight?: number;
    /** footer max width in mm*/
    footerMaxWidth?: number;
    /** footer max height in mm*/
    footerMaxHeight?: number;
    /** Left max width in mm*/
    leftMargin?: number;
    /** Right max width in mm*/
    rightMargin?: number;
    /** Top max width in mm*/
    topMargin?: number;
    /** Bottom max width in mm*/
    bottomMargin?: number;
    footerImageUrl?: string;
}

export async function printDomWithStyles(element: HTMLElement, opts: PrintDomWithStylesOptions = {}) {
    const contents = element.outerHTML;
    const cssLinks: string[] = [];
    const cssStyles = [];

    if (!opts.inlineStyles) {
        document.querySelectorAll<HTMLLinkElement>('link[rel=stylesheet]').forEach((e) => {
            cssLinks.push(e.href);
        });
        document.querySelectorAll<HTMLLinkElement>('style').forEach((e) => {
            cssStyles.push(e.innerHTML);
        });
    }
    const targetPaperSize = opts.paperSize?.toLowerCase() ?? 'a4';
    if (typeof opts.paperSize === 'number') {
        if (undefined === opts.leftMargin) {
            opts.leftMargin = opts.paperSize;
        }
        if (undefined === opts.rightMargin) {
            opts.rightMargin = opts.paperSize;
        }
        if (undefined === opts.bottomMargin) {
            opts.bottomMargin = opts.paperSize;
        }
        if (undefined === opts.topMargin) {
            opts.topMargin = opts.paperSize;
        }
    }
    if (!opts.headerMaxWidth) {
        if (targetPaperSize.startsWith('a4')) {
            opts.headerMaxWidth = 210;
        } else if (targetPaperSize.startsWith('letter')) {
            opts.headerMaxWidth = 216;
        } else if (targetPaperSize.startsWith('a5')) {
            opts.headerMaxWidth = 148;
        }

        if (opts.headerMaxWidth) {
            if (opts.leftMargin) {
                opts.headerMaxWidth -= opts.leftMargin;
            }
            if (opts.rightMargin) {
                opts.headerMaxWidth -= opts.rightMargin;
            }
        }
    }
    if (!opts.footerMaxWidth) {
        if (targetPaperSize.startsWith('a4')) {
            opts.footerMaxWidth = 210;
        } else if (targetPaperSize.startsWith('letter')) {
            opts.footerMaxWidth = 216;
        } else if (targetPaperSize.startsWith('a5')) {
            opts.footerMaxWidth = 148;
        }

        if (opts.footerMaxWidth) {
            if (opts.leftMargin) {
                opts.footerMaxWidth -= opts.leftMargin;
            }
            if (opts.rightMargin) {
                opts.footerMaxWidth -= opts.rightMargin;
            }
        }
        if (opts.showPrintTime || opts.pageCounter) {
            opts.footerMaxWidth -= 55;
        }
    }

    // opts.headerImageUrl = 'https://placehold.co/1200x80?text=Header';
    const headerMaxHeight = opts.headerMaxHeight ?? 100;
    const footerMaxHeight = opts.footerMaxHeight ?? 50;

    if (opts.headerImageUrl) {
        const { dataUrl: url, newHeight } = await resizeImageToDataURL(
            opts.headerImageUrl,
            MM_TO_PX * opts.headerMaxWidth,
            MM_TO_PX * headerMaxHeight
        );

        const newHeightInMm = +(newHeight / MM_TO_PX).toFixed(2);
        if (newHeightInMm > opts.topMargin) {
            opts.topMargin = newHeightInMm;
        }

        cssStyles.push(`
        @page {
            @top-center {
                content: url('${url}');
            }
        `);

        /*
                const { dataUrl: url, newHeight,newWidth } = await convertImageToDataURLWithDimensions(
                    opts.headerImageUrl,
                    MM_TO_PX * opts.headerMaxWidth,
                    MM_TO_PX * headerMaxHeight,
                );

                const newHeightInMm = +(newHeight / MM_TO_PX).toFixed(2);
                const newWidthInMm = +(newWidth / MM_TO_PX).toFixed(2);
                if (newHeightInMm > opts.topMargin) {
                    opts.topMargin = newHeightInMm;
                }
                cssStyles.push(`
                @page {
                    @top-center {
                        content: url("data:image/svg+xml;utf8, <svg xmlns='http://www.w3.org/2000/svg' width='${newWidthInMm}mm' height='${newHeightInMm}mm'> <image href='${url}' width='${newWidthInMm}mm' height='${newHeightInMm}mm'/></svg>");
                        background:'yellow
                    }
                `);*/
    }
    if (opts.firstPageHeaderImageUrl) {
        const { dataUrl: url, newHeight } = await resizeImageToDataURL(
            opts.firstPageHeaderImageUrl,
            MM_TO_PX * opts.headerMaxWidth,
            MM_TO_PX * headerMaxHeight
        );

        const newHeightInMm = +(newHeight / MM_TO_PX).toFixed(2);

        let differentFirstPageTopMargin = null;
        if (newHeightInMm > opts.topMargin) {
            differentFirstPageTopMargin = newHeightInMm;
        }

        cssStyles.push(`
        @page:first {
            @top-center {
                content: url('${url}');
            }
            margin-top: ${typeof differentFirstPageTopMargin === 'number' ? differentFirstPageTopMargin + 'mm!important' : ''};

        `);

    }
    if (opts.footerImageUrl) {
        const { dataUrl: url, newHeight } = await resizeImageToDataURL(
            opts.footerImageUrl,
            MM_TO_PX * opts.footerMaxWidth,
            MM_TO_PX * footerMaxHeight
        );

        const newHeightInMm = +(newHeight / MM_TO_PX).toFixed(2);
        if (newHeightInMm > opts.bottomMargin) {
            opts.bottomMargin = newHeightInMm;
        }

        cssStyles.push(`
        @page {
            @bottom-center {
                content: url('${url}');
            }
        `);

    }

    const dir = window.getComputedStyle(document.body).direction;
    const fontFamily = window.getComputedStyle(document.body).fontFamily;
    cssStyles.push(`body{background:white; font-family:${fontFamily}!important; direction: ${dir}; text-align:${dir === 'ltr' ? 'left' : 'right'};}`);
    cssStyles.push(
        `
        @page {
            size: ${targetPaperSize} ;
            margin: ${typeof opts.paperMargin === 'number' ? opts.paperMargin + 'mm' : opts.paperMargin || '8mm'};
            margin-top: ${typeof opts.topMargin === 'number' ? opts.topMargin + 'mm' : ''};
            margin-bottom: ${typeof opts.bottomMargin === 'number' ? opts.bottomMargin + 'mm' : ''};
            margin-left: ${typeof opts.leftMargin === 'number' ? opts.leftMargin + 'mm' : ''};
            margin-right: ${typeof opts.rightMargin === 'number' ? opts.rightMargin + 'mm' : ''};
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;

        }
    `
    );
    cssStyles.push(
        `
            @page {

                @bottom-left {
                ` +
        (opts.pageCounter
            ? `
                    content: 'Page ' counter(page) ' of ' counter(pages);
                    vertical-align: bottom;
                    padding-bottom: 10px;
                    font-size: 10px;
                    `
            : ``) +
        `
                }

                @bottom-right {
                  ` +
        (opts.showPrintTime
            ? `
                    content: '🖨️ ${moment().format('YYYY-MM-DD HH:mm')}';
                    vertical-align: bottom;
                    padding-bottom: 10px;
                    font-size: 10px;
                    `
            : ``) +
        `
                }
            }`
    );

    if (opts.backgroundImage) {
        cssStyles.push(`body{ background-image: url('${opts.backgroundImage}')!important; background-size: cover; background-repeat: no-repeat;} `);
        if (opts.bodyTopMargin) {
            cssStyles.push(` body{padding-top:${typeof opts.bodyTopMargin === 'number' ? opts.paperMargin + 'cm' : opts.paperMargin || '0'}`);
        }
    }

    let htmlRootClass = '';
    if (opts.themeClassName) {
        htmlRootClass = opts.themeClassName;
    } else {
        htmlRootClass = 'light';
    }

    return new Promise<void>((mainPromiseResolve) => {
        const printFrame = document.createElement('iframe');
        printFrame.style.position = 'absolute';
        printFrame.style.left = '-1';
        printFrame.style.visibility = 'hidden';

        document.body.appendChild(printFrame);

        printFrame.onload = async () => {
            const printDocument = printFrame.contentWindow?.document ?? printFrame.contentDocument;

            const images = printDocument.images;
            if (images.length > 0) {
                await Promise.all(
                    Array.from(images).map((image) => {
                        if (image.src && image.src !== window.location.href) {
                            return new Promise<void>((resolve) => {
                                if (image.complete) {
                                    resolve();
                                } else {
                                    image.addEventListener('load', () => resolve());
                                    image.addEventListener('error', () => resolve());
                                }
                            });
                        } else {
                            return Promise.resolve();
                        }
                    })
                );
            }

            await printDocument.fonts.ready;

            await new Promise<void>((resolve) => {
                printFrame.focus();
                try {
                    printFrame.contentWindow.document.execCommand('print', false, null);
                    resolve();
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (_) {
                    // console.log("Printing with timeout")
                    setTimeout(function() {
                        printFrame.contentWindow.print();
                        resolve();
                    }, 500);
                }
            });
            if (opts.successCallback) {
                opts.successCallback();
            }
            // printFrame.remove();
            mainPromiseResolve();
        };
        printFrame.srcdoc =
            `<html lang="${document.body.parentElement.lang}" class="${htmlRootClass}"><head><title>${opts.documentTitle || document.title}</title>` +
            cssLinks
                .map((link) => {
                    return '<link rel="stylesheet" href="' + link + '" />';
                })
                .join('') +
            cssStyles.map((cssStyle) => `<style>${cssStyle}</style>`).join('') +
            `</head><body>${contents}</body></html>`;

        // console.log(printFrame.srcdoc)
        document.body.appendChild(printFrame);
    });
}

async function resizeImageToDataURL(
    imageUrl: string,
    maxWidth: number,
    maxHeight: number
): Promise<{
    dataUrl: string;
    newWidth: number;
    newHeight: number;
}> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous'; // needed for cross-origin images

        img.onload = function() {
            const ratio = Math.min(maxWidth / img.width, maxHeight / img.height, 1);

            const newWidth = img.width * ratio;
            const newHeight = img.height * ratio;

            const canvas = document.createElement('canvas');
            canvas.width = newWidth;
            canvas.height = newHeight;

            const ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            const dataUrl = canvas.toDataURL('image/png');
            resolve({ dataUrl, newWidth, newHeight });
        };

        img.onerror = reject;

        img.src = imageUrl;
    });
}

async function convertImageToDataURLWithDimensions(
    imageUrl: string,
    maxWidth: number,
    maxHeight: number
): Promise<{
    dataUrl: string;
    newWidth: number;
    newHeight: number;
}> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous'; // needed for cross-origin images

        img.onload = function() {
            const ratio = Math.min(maxWidth / img.width, maxHeight / img.height, 1);

            const newWidth = img.width * ratio;
            const newHeight = img.height * ratio;

            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            canvas.getContext('2d').drawImage(img, 0, 0);
            const dataUrl = canvas.toDataURL('image/png');
            resolve({ dataUrl, newWidth, newHeight });
        };

        img.onerror = reject;

        img.src = imageUrl;
    });
}

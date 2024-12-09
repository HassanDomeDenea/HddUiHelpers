import uniqueId from "lodash/uniqueId";

interface PrintDomWithStylesOptions {
    inlineStyles?: boolean
    paperSize?: string,
    paperMargin?: string | number,
    bodyTopMargin?: string | number,
    backgroundImage?: string,
    successCallback?: () => void,
    documentTitle?: () => void,
}

export function printDomWithStyles(element: HTMLElement, opts: PrintDomWithStylesOptions = {}) {
    const contents = element.outerHTML;

    const cssLinks: string[] = [];
    const cssStyles = [];
    if (!opts.inlineStyles) {

        document.querySelectorAll<HTMLLinkElement>('link[rel=stylesheet]').forEach((e) => {
            cssLinks.push(e.href)
        });
        document.querySelectorAll<HTMLLinkElement>('style').forEach((e) => {
            cssStyles.push(e.innerHTML)
        });
    }

    const dir = window.getComputedStyle(document.body).direction;
    const fontFamily = window.getComputedStyle(document.body).fontFamily;

    cssStyles.push(`body{background:white; font-family:${fontFamily}!important; direction: ${dir}; text-align:${dir === 'ltr' ? 'left' : 'right'};}`)
    cssStyles.push(`@media print {
        @page {
            size: ${opts.paperSize || 'A4'} ;
            margin: ${typeof opts.paperMargin === 'number' ? (opts.paperMargin + 'mm') : (opts.paperMargin || '5mm')};
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
        }
    }`);
    if (opts.backgroundImage) {
        cssStyles.push(`body{ background-image: url('${opts.backgroundImage}')!important; background-size: cover; background-repeat: no-repeat;} `)
        if (opts.bodyTopMargin) {
            cssStyles.push(` body{padding-top:${typeof opts.bodyTopMargin === 'number' ? (opts.paperMargin + 'cm') : (opts.paperMargin || '0')}`)
        }

    }

    const printFrame = document.createElement('iframe')
    printFrame.style.position = "absolute";
    printFrame.style.left = "-1";
    printFrame.style.visibility = "hidden";


    document.body.appendChild(printFrame);

    printFrame.onload = async () => {
        const printDocument = printFrame.contentWindow?.document ?? printFrame.contentDocument;

        const images = printDocument.querySelectorAll('img')
        if (images.length > 0) {
            await Promise.all(Array.from(images).map(image => {
                if (image.src && image.src !== window.location.href) {
                    return new Promise<void>(resolve => {
                        const pollImage = () => {
                            if (!image || typeof image.naturalWidth === 'undefined' || image.naturalWidth === 0 || !image.complete) {
                                setTimeout(pollImage, 500)
                            } else {
                                resolve()
                            }
                        }
                        pollImage()
                    })
                } else {
                    return Promise.resolve()
                }
            }))
        }

        //TODO Ensure Fonts are loaded

        await new Promise<void>((resolve) => {
            printFrame.focus()
            try {
                printFrame.contentWindow.document.execCommand('print', false, null)
                resolve();
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (_) {
                // console.log("Printing with timeout")
                setTimeout(function () {
                    printFrame.contentWindow.print()
                    resolve();
                }, 500)
            }
        })
        if (opts.successCallback) {
            opts.successCallback()
        }
        printFrame.remove();
    }
    printFrame.srcdoc = `<html lang="${document.body.parentElement.lang}"><head><title>${opts.documentTitle || document.title}</title>`
        + cssLinks.map(link => {
            return '<link rel="stylesheet" href="' + link + '" />'
        }).join('')
        + `<style>${cssStyles.join(' ')}</style>`
        + `</head><body>${contents}</body></html>`

    document.body.appendChild(printFrame);

}

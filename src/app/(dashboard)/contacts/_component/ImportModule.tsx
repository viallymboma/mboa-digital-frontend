"use client";
import React, { useCallback } from 'react';

import {
  Loader2,
  X,
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import * as XLSX from 'xlsx';

import {
  FileDownloadSvgIcon,
  FileUploadSvgIcon,
  ImportSvgIcon,
} from '@/app/svg_components/SvgIcons';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useContacts } from '@/hooks/useContacts';

const ImportModule = () => {
    const { t } = useTranslation();
    const { importContacts } = useContacts();
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [previewData, setPreviewData] = React.useState<Record<string, unknown>[]>([]);
    const [isUploading, setIsUploading] = React.useState(false);
    const [showPreview, setShowPreview] = React.useState(false);

    const downloadTemplate = () => {
        // Create a link element
        const link = document.createElement('a');
        link.href = '/templates/contacts.xlsx';
        link.download = 'contacts_template.xlsx';
        
        // Append to body, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return;
        const file = acceptedFiles[0];
        setSelectedFile(file);

        // Read the file for preview
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const data = e.target?.result;
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(firstSheet) as Record<string, unknown>[];
                setPreviewData(jsonData);
            } catch (error) {
                console.error('Error reading file:', error);
            }
        };
        reader.readAsArrayBuffer(file);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'application/vnd.ms-excel': ['.xls']
        },
        maxFiles: 1
    });

    const handleImport = async () => {
        if (!selectedFile) return;

        console.log(selectedFile, "PPPPPPPPPPPPPPP")

        try {
            setIsUploading(true);
            await importContacts(selectedFile);
            setSelectedFile(null);
            setPreviewData([]);
        } finally {
            setIsUploading(false);
        }
    };

    // Add this utility function at the top of the file after imports
    const formatFileSize = (bytes: number): string => {
        const kb = bytes / 1024;
        if (kb < 1024) {
            return `${Math.round(kb * 10) / 10} KB`;
        }
        const mb = kb / 1024;
        return `${Math.round(mb * 10) / 10} MB`;
    };

    return (
        <div className='flex flex-col gap-5'>
            {/* Download Template Section */}
            <div 
                className='bg-grayColor rounded-lg flex flex-row items-center p-4 gap-3 cursor-pointer hover:bg-gray-100 transition-colors'
                onClick={downloadTemplate}
            >
                <FileDownloadSvgIcon />
                <div className='flex flex-row gap-3'>
                    <div className='flex flex-row gap-1'>
                        <h1 className='font-bold text-[20px]'>1</h1>
                        <h1 className='font-bold text-[20px]'>.</h1>
                    </div>
                    <div>
                        <h1 className='font-bold text-[20px]'>{t('contact.importContactForm.downloadItem')}</h1>
                        <p>{t('contact.importContactForm.downloaItemDescription')}</p>
                    </div>
                </div>
            </div>

            {/* File Upload Section */}
            <div 
                {...getRootProps()}
                className={`bg-grayColor rounded-lg flex flex-row items-center p-4 gap-3 cursor-pointer
                    ${isDragActive ? 'border-2 border-dashed border-primaryAppearance' : ''}
                    ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}
                    transition-all
                `}
            >
                <input {...getInputProps()} />
                <FileUploadSvgIcon />
                <div className='flex flex-row gap-3'>
                    <div className='flex flex-row gap-1'>
                        <h1 className='font-bold text-[20px]'>2</h1>
                        <h1 className='font-bold text-[20px]'>.</h1>
                    </div>
                    <div>
                        <h1 className='font-bold text-[20px]'>{t('contact.importContactForm.uploadItem')}</h1>
                        <p>
                            {isDragActive 
                                ? t('contact.importContactForm.dropHere')
                                : t('contact.importContactForm.uploadItemDescription')
                            }
                        </p>
                    </div>
                </div>
            </div>

            {/* Selected File Display */}
            {selectedFile && (
                <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                    <div className='flex flex-row'>
                        <ImportSvgIcon  />
                        <div className="flex flex-col items-start">
                            {/* <span className="text-sm font-medium">Selected file:</span> */}
                            <span className="text-sm text-gray-600">{selectedFile.name}</span>
                            <span className="text-sm font-medium">{formatFileSize(selectedFile.size)}</span>
                        </div>
                    </div>
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFile(null);
                            setPreviewData([]);
                        }}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            )}

            {/* Action Buttons */}
            <div className='flex flex-row gap-4 justify-center w-full'>
                <Button
                    variant="outline"
                    onClick={() => setShowPreview(true)}
                    className="w-full h-[56px] text-white bg-black text-[18px]"
                    disabled={!selectedFile}
                >
                    Prévisualiser
                </Button>
                <Button
                    onClick={handleImport}
                    disabled={isUploading || !selectedFile}
                    className="w-full h-[56px] bg-primaryAppearance text-white text-[18px]"
                >
                    {isUploading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        'Importer'
                    )}
                </Button>
            </div>

            {/* Preview Dialog */}
            <Dialog open={showPreview} onOpenChange={setShowPreview}>
                <DialogContent className="max-w-[80vw] max-h-[80vh] overflow-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Preview Data</h2>
                        <Button variant="ghost" size="icon" onClick={() => setShowPreview(false)}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {previewData.length > 0 && 
                                    Object.keys(previewData[0]).map((header) => (
                                        <TableHead key={header}>{header}</TableHead>
                                    ))
                                }
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {previewData.slice(0, 10).map((row, index) => (
                                <TableRow key={index}>
                                    {Object.values(row).map((value: unknown, i) => (
                                        <TableCell key={i}>{String(value)}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {previewData.length > 10 && (
                        <p className="text-sm text-gray-500 mt-4">
                            Showing first 10 rows of {previewData.length} total rows
                        </p>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ImportModule;
























// "use client";
// import React, { useCallback } from 'react';

// import { Loader2 } from 'lucide-react';
// import { useDropzone } from 'react-dropzone';
// import { useTranslation } from 'react-i18next';
// import * as XLSX from 'xlsx';

// import {
//   FileDownloadSvgIcon,
//   FileUploadSvgIcon,
// } from '@/app/svg_components/SvgIcons';
// import { Button } from '@/components/ui/button';
// import {
//   Dialog,
//   DialogContent,
// } from '@/components/ui/dialog';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import { useContacts } from '@/hooks/useContacts';

// const ImportModule = () => {
//     const { t } = useTranslation();
//     const { importContacts, downloadTemplate } = useContacts();
//     const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
//     const [previewData, setPreviewData] = React.useState<Record<string, unknown>[]>([]);
//     const [isUploading, setIsUploading] = React.useState(false);
//     const [showPreview, setShowPreview] = React.useState(false);

//     const onDrop = useCallback(async (acceptedFiles: File[]) => {
//         if (acceptedFiles.length === 0) return;
//         const file = acceptedFiles[0];
//         setSelectedFile(file);

//         // Read the file for preview
//         const reader = new FileReader();
//         reader.onload = async (e) => {
//             try {
//                 const data = e.target?.result;
//                 const workbook = XLSX.read(data, { type: 'array' });
//                 const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
//                 const jsonData = XLSX.utils.sheet_to_json(firstSheet) as Record<string, unknown>[];
//                 setPreviewData(jsonData);
//             } catch (error) {
//                 console.error('Error reading file:', error);
//             }
//         };
//         reader.readAsArrayBuffer(file);
//     }, []);

//     const { getRootProps, getInputProps, isDragActive } = useDropzone({
//         onDrop,
//         accept: {
//             'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
//             'application/vnd.ms-excel': ['.xls']
//         },
//         maxFiles: 1
//     });

//     const handleImport = async () => {
//         if (!selectedFile) return;

//         try {
//             setIsUploading(true);
//             await importContacts(selectedFile);
//             setSelectedFile(null);
//             setPreviewData([]);
//         } finally {
//             setIsUploading(false);
//         }
//     };

//     return (
//         <div className='flex flex-col gap-[2rem]'>
//             {/* Download Template Section */}
//             <div 
//                 className='bg-grayColor rounded-lg flex flex-row items-center p-4 gap-3 cursor-pointer hover:bg-gray-100 transition-colors'
//                 onClick={downloadTemplate}
//             >
//                 <FileDownloadSvgIcon />
//                 <div className='flex flex-row gap-3'>
//                     <div className='flex flex-row gap-1'>
//                         <h1 className='font-bold text-[20px]'>1</h1>
//                         <h1 className='font-bold text-[20px]'>.</h1>
//                     </div>
//                     <div>
//                         <h1 className='font-bold text-[20px]'>{t('contact.importContactForm.downloadItem')}</h1>
//                         <p>{t('contact.importContactForm.downloaItemDescription')}</p>
//                     </div>
//                 </div>
//             </div>

//             {/* File Upload Section */}
//             <div 
//                 {...getRootProps()}
//                 className={`bg-grayColor rounded-lg flex flex-row items-center p-4 gap-3 cursor-pointer
//                     ${isDragActive ? 'border-2 border-dashed border-primaryAppearance' : ''}
//                     ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}
//                     transition-all
//                 `}
//             >
//                 <input {...getInputProps()} />
//                 <FileUploadSvgIcon />
//                 <div className='flex flex-row gap-3'>
//                     <div className='flex flex-row gap-1'>
//                         <h1 className='font-bold text-[20px]'>2</h1>
//                         <h1 className='font-bold text-[20px]'>.</h1>
//                     </div>
//                     <div>
//                         <h1 className='font-bold text-[20px]'>{t('contact.importContactForm.uploadItem')}</h1>
//                         <p>
//                             {isDragActive 
//                                 ? t('contact.importContactForm.dropHere')
//                                 : selectedFile 
//                                     ? `Selected: ${selectedFile.name}`
//                                     : t('contact.importContactForm.uploadItemDescription')
//                             }
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             {/* Action Buttons */}
//             {selectedFile && (
//                 <div className='flex flex-row gap-4 justify-end'>
//                     <Button
//                         variant="outline"
//                         onClick={() => setShowPreview(true)}
//                         className="w-[150px]"
//                     >
//                         Preview Data
//                     </Button>
//                     <Button
//                         onClick={handleImport}
//                         disabled={isUploading}
//                         className="w-[150px] bg-primaryAppearance text-white"
//                     >
//                         {isUploading ? (
//                             <Loader2 className="h-4 w-4 animate-spin" />
//                         ) : (
//                             'Import Contacts'
//                         )}
//                     </Button>
//                 </div>
//             )}

//             {/* Preview Dialog */}
//             <Dialog open={showPreview} onOpenChange={setShowPreview}>
//                 <DialogContent className="max-w-[80vw] max-h-[80vh] overflow-auto">
//                     <h2 className="text-xl font-bold mb-4">Preview Data</h2>
//                     <Table>
//                         <TableHeader>
//                             <TableRow>
//                                 {previewData.length > 0 && 
//                                     Object.keys(previewData[0]).map((header) => (
//                                         <TableHead key={header}>{header}</TableHead>
//                                     ))
//                                 }
//                             </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                             {previewData.slice(0, 10).map((row, index) => (
//                                 <TableRow key={index}>
//                                     {Object.values(row).map((value: unknown, i) => (
//                                         <TableCell key={i}>{String(value)}</TableCell>
//                                     ))}
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                     {previewData.length > 10 && (
//                         <p className="text-sm text-gray-500 mt-4">
//                             Showing first 10 rows of {previewData.length} total rows
//                         </p>
//                     )}
//                 </DialogContent>
//             </Dialog>
//         </div>
//     );
// };

// export default ImportModule;













// "use client";
// import React, { useCallback } from 'react';

// import { Loader2 } from 'lucide-react';
// import { useDropzone } from 'react-dropzone';
// import { useTranslation } from 'react-i18next';

// import {
//   FileDownloadSvgIcon,
//   FileUploadSvgIcon,
// } from '@/app/svg_components/SvgIcons';
// import { useContacts } from '@/hooks/useContacts';

// import ButtonList from '../../_components/_global/ButtonList';
// import CreateContactForm from './CreateContactForm';
// import MessageComponent from './MessageComponent';

// const ImportModule = () => {
//     const { t } = useTranslation();
//     const { importContacts, downloadTemplate } = useContacts();
//     const [isUploading, setIsUploading] = React.useState(false);

//     const onDrop = useCallback(async (acceptedFiles: File[]) => {
//         if (acceptedFiles.length === 0) return;

//         try {
//             setIsUploading(true);
//             await importContacts(acceptedFiles[0]);
//         } finally {
//             setIsUploading(false);
//         }
//     }, [importContacts]);

//     const { getRootProps, getInputProps, isDragActive } = useDropzone({
//         onDrop,
//         accept: {
//             'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
//             'application/vnd.ms-excel': ['.xls']
//         },
//         maxFiles: 1
//     });

//     const buttons = [
//         {
//             label: 'Prévisualiser',
//             dialoContentStyle: "sm:max-w-[500px]",
//             buttonBg: "bg-black text-[18px]",
//             dialogContent: <MessageComponent />,
//         },
//         {
//             label: 'contact.emptyUI.newContact',
//             dialoContentStyle: "sm:max-w-[425px]",
//             buttonBg: "bg-primaryAppearance text-[18px]",
//             dialogContent: <CreateContactForm />,
//         },
//     ];

//     return (
//         <div className='flex flex-col gap-[2rem]'>
//             <div 
//                 className='bg-grayColor rounded-lg flex flex-row items-center p-4 gap-3 cursor-pointer hover:bg-gray-100 transition-colors'
//                 onClick={downloadTemplate}
//             >
//                 <FileDownloadSvgIcon />
//                 <div className='flex flex-row gap-3'>
//                     <div className='flex flex-row gap-1'>
//                         <h1 className='font-bold text-[20px]'>1</h1>
//                         <h1 className='font-bold text-[20px]'>.</h1>
//                     </div>
//                     <div>
//                         <h1 className='font-bold text-[20px]'>{t('contact.importContactForm.downloadItem')}</h1>
//                         <p>{t('contact.importContactForm.downloaItemDescription')}</p>
//                     </div>
//                 </div>
//             </div>

//             <div 
//                 {...getRootProps()}
//                 className={`bg-grayColor rounded-lg flex flex-row items-center p-4 gap-3 cursor-pointer
//                     ${isDragActive ? 'border-2 border-dashed border-primaryAppearance' : ''}
//                     ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}
//                     transition-all
//                 `}
//             >
//                 <input {...getInputProps()} />
//                 {isUploading ? (
//                     <Loader2 className="h-6 w-6 animate-spin" />
//                 ) : (
//                     <FileUploadSvgIcon />
//                 )}
//                 <div className='flex flex-row gap-3'>
//                     <div className='flex flex-row gap-1'>
//                         <h1 className='font-bold text-[20px]'>2</h1>
//                         <h1 className='font-bold text-[20px]'>.</h1>
//                     </div>
//                     <div>
//                         <h1 className='font-bold text-[20px]'>{t('contact.importContactForm.uploadItem')}</h1>
//                         <p>
//                             {isDragActive 
//                                 ? t('contact.importContactForm.dropHere')
//                                 : t('contact.importContactForm.uploadItemDescription')
//                             }
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             <div className='flex flex-row gap-3 w-full'>
//                 <ButtonList buttons={buttons} />
//             </div>
//         </div>
//     );
// };

// export default ImportModule;















// "use client";

// import React from 'react';

// import { useTranslation } from 'react-i18next';

// import {
//   FileDownloadSvgIcon,
//   FileUploadSvgIcon,
// } from '@/app/svg_components/SvgIcons';

// // import { Card } from '@/components/ui/card';
// import ButtonList from '../../_components/_global/ButtonList';
// import CreateContactForm from './CreateContactForm';
// import MessageComponent from './MessageComponent';

// const ImportModule = () => {
//     const buttons = [
//         {
//             label: 'Prévisualiser',
//             // icon: AddMessageSvgIcon, 
//             dialoContentStyle: "sm:max-w-[500px]", 
//             buttonBg: "bg-black text-[18px]", 
//             dialogContent: <>
//                 <MessageComponent />
//             </>,
//         },
//         {
//             label: 'contact.emptyUI.newContact',
//             // icon: AddNewContactSvgIcon, 
//             dialoContentStyle: "sm:max-w-[425px]", 
//             buttonBg: "bg-primaryAppearance text-[18px]", 
//             dialogContent: <CreateContactForm />,
//         },
//     ];
//     const { t } = useTranslation();
//     return (
//         <div className='flex flex-col gap-[2rem]'>
//             <div className='bg-grayColor rounded-lg flex flex-row items-center p-4 gap-3'>
//                 <div>
//                     <FileDownloadSvgIcon />
//                 </div>
//                 <div className='flex flex-row gap-3'>
//                     <div className='flex flex-row gap-1'>
//                         <h1 className='font-bold text-[20px]'>1</h1>
//                         <h1 className='font-bold text-[20px]'>.</h1>
//                     </div>
//                     <div>
//                         <h1 className='font-bold text-[20px]'>{t('contact.importContactForm.downloadItem')}</h1>
//                         <p>{t('contact.importContactForm.downloaItemDescription')}</p>
//                     </div>
//                 </div>
//             </div>
//             <div className='bg-grayColor rounded-lg flex flex-row items-center p-4 gap-3 '>
//                 <div className=''>
//                     <FileUploadSvgIcon />
//                 </div>
//                 <div className='flex flex-row gap-3'>
//                     <div className='flex flex-row gap-1'>
//                         <h1 className='font-bold text-[20px]'>2</h1>
//                         <h1 className='font-bold text-[20px]'>.</h1>
//                     </div>
//                     <div>
//                         <h1 className='font-bold text-[20px]'>{t('contact.importContactForm.uploadItem')}</h1>
//                         <p>{t('contact.importContactForm.uploadItemDescription')}</p>
//                     </div>
//                 </div>
//             </div>

//             <div className='flex flex-row gap-3 w-full'>
//                 <ButtonList buttons={buttons} />
//             </div>
//         </div>
//     )
// }

// export default ImportModule
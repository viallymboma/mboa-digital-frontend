"use client";
import React, { useCallback } from 'react';

import {
  Loader2,
  X,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useDropzone } from 'react-dropzone';
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
import { notify } from '@/components/utilities/helper';
import { useContacts } from '@/hooks/useContacts';

const formatFileSize = (bytes: number): string => {
    const kb = bytes / 1024;
    if (kb < 1024) {
        return `${Math.round(kb * 10) / 10} KB`;
    }
    const mb = kb / 1024;
    return `${Math.round(mb * 10) / 10} MB`;
};

const ImportModule = () => {
    const t = useTranslations('contact.importContactForm');
    const { importContacts } = useContacts();
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [previewData, setPreviewData] = React.useState<Record<string, unknown>[]>([]);
    const [isUploading, setIsUploading] = React.useState(false);
    const [showPreview, setShowPreview] = React.useState(false);

    const downloadTemplate = () => {
        try {
            const link = document.createElement('a');
            link.href = '/templates/contacts.xlsx';
            link.download = 'contacts_template.xlsx';
            link.onerror = () => {
                console.error('Failed to download template');
                notify.error(t('downloadError'));
            };
            document.body.appendChild(link);
            link.click();
            notify.success(t('downloadSuccess'));
            document.body.removeChild(link);
        } catch (error) {
            console.error('Download error:', error);
            notify.error(t('downloadError'));
        }
    };

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return;
        const file = acceptedFiles[0];
        setSelectedFile(file);

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

        try {
            setIsUploading(true);
            await importContacts(selectedFile);
            setSelectedFile(null);
            setPreviewData([]);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className='flex flex-col gap-5'>
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
                        <h1 className='font-bold text-[20px]'>{t('downloadItem')}</h1>
                        <p>{t('downloaItemDescription')}</p>
                    </div>
                </div>
            </div>

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
                        <h1 className='font-bold text-[20px]'>{t('uploadItem')}</h1>
                        <p>
                            {isDragActive 
                                ? t('dropHere')
                                : t('uploadItemDescription')
                            }
                        </p>
                    </div>
                </div>
            </div>

            {selectedFile && (
                <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                    <div className='flex flex-row'>
                        <ImportSvgIcon  />
                        <div className="flex flex-col items-start">
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

            <div className='flex flex-row gap-4 justify-center w-full'>
                <Button
                    variant="outline"
                    onClick={() => setShowPreview(true)}
                    className="w-full h-[56px] text-white bg-black text-[18px]"
                    disabled={!selectedFile}
                >
                    {t('previewButton')}
                </Button>
                <Button
                    onClick={handleImport}
                    disabled={isUploading || !selectedFile}
                    className="w-full h-[56px] bg-primaryAppearance text-white text-[18px]"
                >
                    {isUploading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        t('importButton')
                    )}
                </Button>
            </div>

            <Dialog open={showPreview} onOpenChange={setShowPreview}>
                <DialogContent className="max-w-[80vw] max-h-[80vh] overflow-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">{t('previewTitle')}</h2>
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
                            {t('previewRows', { count: previewData.length })}
                        </p>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ImportModule;

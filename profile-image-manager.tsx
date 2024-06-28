import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Camera, Trash2, Crop, Upload } from 'lucide-react';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const SUPPORTED_FORMATS = ['image/jpeg', 'image/png'];

const ProfileImageManager = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);
  const [isCropDialogOpen, setIsCropDialogOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setError('Die Datei ist zu groß. Maximale Größe ist 5 MB.');
        return;
      }
      if (!SUPPORTED_FORMATS.includes(file.type)) {
        setError('Nicht unterstütztes Bildformat. Bitte JPEG oder PNG verwenden.');
        return;
      }
      setError(null);
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCropImage = () => {
    setIsCropDialogOpen(true);
    // Hier würde die tatsächliche Logik zum Zuschneiden implementiert werden
  };

  const handleSaveImage = () => {
    // Hier würde die Logik zum Speichern des Bildes implementiert werden
    console.log('Bild gespeichert:', image);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Profilbild verwalten</h2>
      
      {previewUrl && (
        <div className="mb-4">
          <img src={previewUrl} alt="Profilbild Vorschau" className="w-32 h-32 rounded-full object-cover mx-auto" />
        </div>
      )}
      
      <div className="flex gap-2 mb-4">
        <Button onClick={() => fileInputRef.current.click()}>
          <Upload className="mr-2 h-4 w-4" /> Bild hochladen
        </Button>
        <Input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageUpload}
          accept="image/jpeg,image/png"
        />
        
        {image && (
          <>
            <Button variant="outline" onClick={handleCropImage}>
              <Crop className="mr-2 h-4 w-4" /> Zuschneiden
            </Button>
            <Button variant="destructive" onClick={handleDeleteImage}>
              <Trash2 className="mr-2 h-4 w-4" /> Löschen
            </Button>
          </>
        )}
      </div>
      
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {image && (
        <Button onClick={handleSaveImage} className="w-full">
          Profilbild speichern
        </Button>
      )}

      <Dialog open={isCropDialogOpen} onOpenChange={setIsCropDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bild zuschneiden</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center h-64 bg-gray-100">
            {previewUrl && <img src={previewUrl} alt="Zuschneiden" className="max-h-full" />}
          </div>
          <DialogFooter>
            <Button onClick={() => setIsCropDialogOpen(false)}>Fertig</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileImageManager;

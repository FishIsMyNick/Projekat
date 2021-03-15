using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Helpers
{
    public static class FileHandler
    {
        public static void Init()
        {

        }
        public static async Task Refresh()
        {
            ClearImageDirs();
            await BlobHandler.DownloadCarImages();
            await BlobHandler.DownloadCompanyImages();
        }
        public static void ClearImageDirs()
        {
            DirectoryInfo di = new DirectoryInfo(BlobHandler.downloadFileDirKola);

            foreach (FileInfo file in di.GetFiles())
            {
                file.Delete();
            }
            foreach (DirectoryInfo dir in di.GetDirectories())
            {
                dir.Delete(true);
            }
            di = new DirectoryInfo(BlobHandler.downloadFileDirKompanije);

            foreach (FileInfo file in di.GetFiles())
            {
                file.Delete();
            }
            foreach (DirectoryInfo dir in di.GetDirectories())
            {
                dir.Delete(true);
            }
        }
        public static async Task SaveImage(IFormFile img, string filePath)
        {
            using FileStream fs = File.OpenWrite(filePath);
            await img.CopyToAsync(fs);
            fs.Close();
        }
    }
}

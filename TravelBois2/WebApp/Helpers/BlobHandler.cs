using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.Text;

namespace WebApp.Helpers
{
	public static class BlobHandler
	{
        private static readonly string blobConnString = "DefaultEndpointsProtocol=https;AccountName=pusgs;AccountKey=R3v93mJv7KrKr7aYqFRM4S3aDqGiXP2sRpgoDNvFfJranEr6OqZRLbMw25aTJDmLtg0pxvQ2C8S48lJuRfqc1A==;EndpointSuffix=core.windows.net";
        public static string downloadFileDirKola = "./ClientApp/src/assets/images/RentACar/Kola/";
        public static string downloadFileDirKompanije = "./ClientApp/src/assets/images/RentACar/Kompanije/";
        private static BlobServiceClient _blobServiceClient;
        private static BlobContainerClient _kolaContainerClient;
        private static BlobContainerClient _kompanijeContainerClient;

                // Blob clienti
        private static BlobClient _blobClient;
        private static BlobDownloadInfo _download;
        public static void Init()
        {
            string connectionString = Environment.GetEnvironmentVariable("AZURE_STORAGE_CONNECTION_STRING");

            // Servis
            _blobServiceClient = new BlobServiceClient(connectionString);

            // Kontejneri
            _kolaContainerClient = _blobServiceClient.GetBlobContainerClient("kola");
            _kompanijeContainerClient = _blobServiceClient.GetBlobContainerClient("kompanije");
        }

        public static async Task DownloadCarImages()
        {
            foreach (BlobItem blob in _kolaContainerClient.GetBlobs())
            {
                _blobClient = _kolaContainerClient.GetBlobClient(blob.Name);
                _download = await _blobClient.DownloadAsync();

                using (FileStream downloadFileStream = File.OpenWrite(Path.Combine(downloadFileDirKola, blob.Name)))
                {
                    await _download.Content.CopyToAsync(downloadFileStream);
                    downloadFileStream.Close();
                }
            }
        }
        public static async Task DownloadConpanyImages()
        {
            foreach (BlobItem blob in _kompanijeContainerClient.GetBlobs())
            {
                _blobClient = _kompanijeContainerClient.GetBlobClient(blob.Name);
                _download = await _blobClient.DownloadAsync();

                using (FileStream downloadFileStream = File.OpenWrite(Path.Combine(downloadFileDirKompanije, blob.Name)))
                {
                    await _download.Content.CopyToAsync(downloadFileStream);
                    downloadFileStream.Close();
                }
            }
        }

        public static async Task UploadCarImage(IFormFile img, string filename)
        {
            //Make name
            string imageName = filename.Replace(" ", "-").Split('.')[0] + ".jpg";
            //Make path
            string filePath = Path.Combine(downloadFileDirKola, imageName);
            //Get blob client
            _blobClient = _kolaContainerClient.GetBlobClient(imageName);
            //Upload to blob
            var response = await _blobClient.UploadAsync(img.OpenReadStream());
            //Save locally
            await FileHandler.SaveImage(img, filePath);
        }
        public static async Task UploadCompanyImage(IFormFile img, string filename)
        {
			//Make name
            string imageName = filename.Replace(" ", "-").Split('.')[0] + ".jpg";
            //Make path
            string filePath = Path.Combine(downloadFileDirKompanije, imageName);
            //Get blob client
            _blobClient = _kompanijeContainerClient.GetBlobClient(imageName);
            //Upload to blob
            await _blobClient.UploadAsync(img.OpenReadStream());
            //Save locally
            await FileHandler.SaveImage(img, filePath);
        }
	}
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using System.IO;
using System.Threading.Tasks;
using Azure;
using WebApp.Helpers;

namespace WebApp
{
    public class Program
    {
        

        public static async Task Main(string[] args)
        {
            #region Inicijalizacija
            /// Ciscenje pre pocetka /////////////////////////
            /// 
                FileHandler.ClearImageDirs();
            ///////////////////////////////////////////////////
            ///

            /// Setup /////////////////////////////////////////
            /// 
                BlobHandler.Init();
                // Ucitavanje slika
                // Kola
                    await BlobHandler.DownloadCarImages();

                // Kompanije
                    await BlobHandler.DownloadConpanyImages();
            ///////////////////////////////////////////////////
            ///
			#endregion
            
			//using FileStream uploadFileStream = File.OpenRead(localFilePath);
			//await blobClient.UploadAsync(uploadFileStream, true);
			//uploadFileStream.Close();


			CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}

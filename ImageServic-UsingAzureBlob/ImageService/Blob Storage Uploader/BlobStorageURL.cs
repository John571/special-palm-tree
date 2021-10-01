using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Configuration;
using System.IO;
using Microsoft.Extensions.Configuration;


namespace ImageService
{
    public class BlobStorageURL
    {
        private static string connectionString = "<Your Account Storage Connection String>";
        private static string containerName = "<Your Blob Container Name>";
        public static string Upload(IFormFile photo)
        {
            BlobContainerClient container = new BlobContainerClient(connectionString, containerName);

            //Generate Uniqe File ID
            Guid FileName = Guid.NewGuid();

            // Get a reference to a blob
            BlobClient blob = container.GetBlobClient(FileName.ToString() + ".jpg");

            var blobHttpHeader = new BlobHttpHeaders { ContentType = "image/jpeg" };

            using (Stream file = photo.OpenReadStream())
            {
                blob.Upload(file , new BlobUploadOptions { HttpHeaders = blobHttpHeader });
            }

            var uri = blob.Uri.AbsoluteUri;

            return uri;

        }
    }
}

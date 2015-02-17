using System.IO;
using System.Threading.Tasks;
using Microsoft.WindowsAzure;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace Wizard.Api.Adapters
{
    public interface IAzureAdapter
    {
        Task<string> DownloadTextAsync(string fileName);
        Task UploadTextAsync(string fileName, string valueToUpload);
    }

    public class AzureAdapter : IAzureAdapter
    {
        public async Task<string> DownloadTextAsync(string fileName)
        {
            var blob = await GetBlockBlob(fileName);
            
            using (Stream stream = new MemoryStream())
            {
                await blob.DownloadToStreamAsync(stream);

                stream.Position = 0;

                using (var streamReader = new StreamReader(stream))
                {
                    return streamReader.ReadToEnd();
                }
            }
        }

        public async Task UploadTextAsync(string fileName, string valueToUpload)
        {
            var blob = await GetBlockBlob(fileName);
            
            using (var stream = new MemoryStream(System.Text.Encoding.UTF8.GetBytes(valueToUpload)))
            {
                stream.Position = 0;
                await blob.UploadFromStreamAsync(stream);
            }
        }

        private static async Task<ICloudBlob> GetBlockBlob(string fileName)
         {
             var container = await GetContainer();
             return container.GetBlockBlobReference(fileName);
         }

        private static async Task<CloudBlobContainer> GetContainer()
        {
            var account = CloudStorageAccount.Parse(CloudConfigurationManager.GetSetting(Codes.Azure.ConnectionStrings.ConnectionStringName));
            var blobClient = account.CreateCloudBlobClient();
            var container = blobClient.GetContainerReference(Codes.Azure.Containers.WizardModel);

            container.CreateIfNotExists();
            return container;
        }
    }
}
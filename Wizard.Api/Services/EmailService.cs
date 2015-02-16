using System.Threading.Tasks;
using Wizard.Api.Adapters;
using Wizard.Api.Extensions;
using Wizard.Api.Models;

namespace Wizard.Api.Services
{
    public interface IEmailService
    {
        Task StoreEmail(string fileName, string email);
    }

    public class EmailService : IEmailService
    {
        private readonly IAzureAdapter _azure;

        public EmailService(IAzureAdapter azure)
        {
            _azure = azure;
        }

        public async Task StoreEmail(string fileName, string email)
        {
            var emailToSave = new EmailContract
                {
                    Email = email
                };

            await _azure.UploadTextAsync(fileName, emailToSave.ToJson<EmailContract>());
        }
    }
}
using System.Web.Http;
using Wizard.Api.Services;

namespace Wizard.Api.Controllers
{
    public class EmailController : ApiController
    {
        private readonly IEmailService _emailService;

        public EmailController(IEmailService emailService)
        {
            _emailService = emailService;
        }

        // POST api/values
        [HttpPost]
        public void Post([FromUri] string email)
        {
            var fileName = string.Format("{0}.json", email);
            _emailService.StoreEmail(fileName, email);
        }
    }
}
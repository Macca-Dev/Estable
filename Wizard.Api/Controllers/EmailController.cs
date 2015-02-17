using System.Collections.Generic;
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
            var fileName = "email-E8067D9D-24EE-4E63-BEF2-8FD4C3BFA279.json";

            _emailService.StoreEmail(fileName, email);
        }

        // PUT api/values/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
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
        public void Post([FromUri] string email)
        {
            var fileName = "aed6d8de-9932-4c58-ac0e-924ff73acb07.xml";


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
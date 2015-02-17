using Ninject.Modules;
using Wizard.Api.Adapters;
using Wizard.Api.Services;

namespace Wizard.Api.IoC.Modules
{
    public class ServiceModule : NinjectModule
    {
        public override void Load()
        {
            Bind<IEmailService>().To<EmailService>().InSingletonScope();
            Bind<IAzureAdapter>().To<AzureAdapter>().InSingletonScope();
        }
    }
}
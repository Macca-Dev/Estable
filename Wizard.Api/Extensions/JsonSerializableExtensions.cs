using System.IO;
using System.Runtime.Serialization.Json;
using System.Text;
using Wizard.Api.Contracts;

namespace Wizard.Api.Extensions
{
    public static class JsonSerializableExtensions
    {
        public static string ToJson<T>(this JsonSerializable obj)
        {
            using (var stream = new MemoryStream())
            {
                var serializer = new DataContractJsonSerializer(typeof(T));
                serializer.WriteObject(stream, obj);
                return Encoding.UTF8.GetString(stream.ToArray());
            }
        }

        public static T FromJson<T>(this string obj)
        {
            using (var stream = new MemoryStream(Encoding.UTF8.GetBytes(obj)))
            {
                var serializer = new DataContractJsonSerializer(typeof(T));
                return (T) serializer.ReadObject(stream);
            }
        }
    }
}
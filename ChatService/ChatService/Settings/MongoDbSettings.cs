using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatService.Settings
{
    public class MongoDbSettings
    {
        public string CosmosConnectionString { get; set; }

        public string ConnectionString
        {
            get
            {
                return $"mongodb://localhost:27017";
                //return $"mongodb://cosmoschatservice:{CosmosConnectionString}";
            }
        }
    }
}

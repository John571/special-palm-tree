﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ImageService.Settings
{
    public class MongoDbSettings
    {
        public string CosmosConnectionString { get; set; }

        public string ConnectionString
        {
            get
            {
                return $"mongodb://cosmosimageservice:{CosmosConnectionString}";
            }
        }
    }
}

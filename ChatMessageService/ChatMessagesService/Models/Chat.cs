using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExpressTimezone;
using System.Globalization;

namespace ChatMessagesService.Models
{
    public class Chat
    {
        public string Id { get; set; }

        public List<Messages> msg { get; set; }

    }
    public class Messages
    {
        public string UserName { get; set; }

        public string msg { get; set; }
        public string Date { get; set; }

        public Messages()
        {
            string date = Date;
            if(date == null)
            {
                var currentDate = DateTime.UtcNow.UTCToRegionalTime("Israel");
                
                Date = currentDate.ToString("dd/MM/yyyy hh:mm:ss");
            }
        }
    }
}

using ChatMessagesService.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace ChatMessagesService
{
    public class ChatService
    {
        private readonly IMongoCollection<Chat> _Chat;

        public ChatService(IChatDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _Chat = database.GetCollection<Chat>(settings.CollectionName);
        }

        public Chat Get(string id) =>
            _Chat.Find<Chat>(x => x.Id == id).FirstOrDefault();

        public Chat Create(Chat chat)
        {
            _Chat.InsertOne(chat);
            return chat;
        }
        public Chat Create(Chat chat , string id)
        {
            var filter = Builders<Chat>.Filter.Eq("_id", chat.Id);
            var result = _Chat.Find(filter).ToList();
            result.Add(chat);
            Chat newChat = new Chat();
            newChat.Id = id;
            List<Models.Messages> messages = new List<Messages>();

            foreach (var item in result)
            {
                messages.AddRange(item.msg);
            }

            newChat.msg = new List<Messages>();
            newChat.msg.AddRange(messages);

            _Chat.DeleteOne(chat => chat.Id == id);

            _Chat.InsertOne(newChat);

            return newChat;
        }

        public void Remove(string id) =>
            _Chat.DeleteOne(chat => chat.Id == id);
    }
}

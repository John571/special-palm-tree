using ChatService.Entities;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatService.Repositories
{
    public class MongoDbChatRepository : IChatRepository
    {
        //Database Name
        private const string DatabaseName = "ChatUploader";

        //Database Collection Name
        private const string CollectionName = "GroupMessages";

        private readonly IMongoCollection<Chat> ChatCollection;

        private readonly FilterDefinitionBuilder<Chat> filterBuilder = Builders<Chat>.Filter;

        //Connect To Cosmos MongoDB
        public MongoDbChatRepository(IMongoClient mongoClient)
        {
            IMongoDatabase database = mongoClient.GetDatabase(DatabaseName);
            ChatCollection = database.GetCollection<Chat>(CollectionName);
        }


        //Delete All Group Messages From Database
        //Maybe we need a Loop !! 
        public void DeleteAllGroupMessages(string id)
        {
            var filter = filterBuilder.Eq(chat => chat.Id, id);

            //We need to check if the operation DeleteMany is deleting all the group messages
            //if true, then we don't need to implement a loop operation !! 
            ChatCollection.DeleteOne(filter);
        }


        //Get All Group Messages From Database
        //Maybe We Will Change That Later
        public Chat GetAllGroupMessages(string id)
        { 
            //I Think We need To change this operation later,
            //because we want all the group messages not just one message !!
            var filter = filterBuilder.Eq(chat => chat.Id, id);
            return ChatCollection.Find(filter).SingleOrDefault();

        }


        //Insert Or Update a New Message Into Database
        public void PostORUpdateMessage(Chat chat)
        {
            ChatCollection.InsertOne(chat);
        } 
    }
}

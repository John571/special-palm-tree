using ImageService.Entities;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ImageService.Repositories
{
    public class MongoDbImagesRepository : IImagesRepository
    {
        private const string dataBaseName = "ImageService";

        private const string collectionName = "Image";

        private readonly IMongoCollection<Image> imagesCollection;

        private readonly FilterDefinitionBuilder<Image> filterBuilder = Builders<Image>.Filter;

        public MongoDbImagesRepository(IMongoClient mongoClient)
        {
            IMongoDatabase database = mongoClient.GetDatabase(dataBaseName);
            imagesCollection = database.GetCollection<Image>(collectionName);
        }
        public void CreatImage(Image image)
        {
            imagesCollection.InsertOne(image);
        }

        public Image GetImage(int id)
        {
            var filter = filterBuilder.Eq(image => image.Id, id);
            return imagesCollection.Find(filter).SingleOrDefault();
        }

        public IEnumerable<Image> GetImages()
        {
            return imagesCollection.Find(new BsonDocument()).ToList();
        }
    }
}

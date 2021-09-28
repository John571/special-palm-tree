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
        //Data Base Name
        private const string dataBaseName = "ImageService";
        //Data Base Collection Name
        private const string collectionName = "ImageUploader";

        private readonly IMongoCollection<Image> imagesCollection;

        private readonly FilterDefinitionBuilder<Image> filterBuilder = Builders<Image>.Filter;

        //Connect To MongoDB
        public MongoDbImagesRepository(IMongoClient mongoClient)
        {
            IMongoDatabase database = mongoClient.GetDatabase(dataBaseName);
            imagesCollection = database.GetCollection<Image>(collectionName);
        }

        //Insert New Data Image To MongoDB
        public void CreatImage(Image image)
        {
            imagesCollection.InsertOne(image);
        }

        //Get Image From MongoDB, By ID
        public Image GetImage(int id)
        {
            var filter = filterBuilder.Eq(image => image.Id, id);
            return imagesCollection.Find(filter).SingleOrDefault();
        }

        //Update Image In MongoDB, With Existing ID
        public void UpdateImage(Image image)
        {
            var filter = filterBuilder.Eq(existingImage => existingImage.Id, image.Id);
            imagesCollection.ReplaceOne(filter, image);
        }

        //Delete Image From MongoDB, By ID
        public void DeleteImage(int id)
        {
            var filter = filterBuilder.Eq(image => image.Id, id);
            imagesCollection.DeleteOne(filter);
        }
    }
}

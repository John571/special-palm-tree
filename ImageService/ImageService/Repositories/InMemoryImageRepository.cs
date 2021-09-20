using ImageService.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ImageService.Repositories
{

    public class InMemoryImageRepository : IImagesRepository
    {
        private readonly List<Image> images = new()
        {
            new Image { Id = 123, ProudctId = 777, Message = "ImageLinkSource-1", Photo = null, CreateDate = DateTime.UtcNow },
            new Image { Id = 456, ProudctId = 888, Message = "ImageLinkSource-2", Photo = null, CreateDate = DateTime.UtcNow },
            new Image { Id = 789, ProudctId = 999, Message = "ImageLinkSource-3", Photo = null, CreateDate = DateTime.UtcNow }
        };

        public IEnumerable<Image> GetImages()
        {
            return images;
        }

        public Image GetImage(int id)
        {
            return images.Where(image => image.Id == id).SingleOrDefault();
        }

        public void CreatImage(Image image)
        {
            images.Add(image);
        }
    }
}

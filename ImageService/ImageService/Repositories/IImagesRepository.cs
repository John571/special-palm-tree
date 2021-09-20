using ImageService.Entities;
using System.Collections.Generic;

namespace ImageService.Repositories
{
    public interface IImagesRepository
    {
        Image GetImage(int id);
        IEnumerable<Image> GetImages();

        void CreatImage(Image image);
    }
}
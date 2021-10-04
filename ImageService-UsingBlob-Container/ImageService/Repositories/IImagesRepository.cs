using ImageService.Entities;
using System.Collections.Generic;

namespace ImageService.Repositories
{
    public interface IImagesRepository
    {
        Image GetImage(int id);

        void CreatImage(Image image);

        void UpdateImage(Image image);

        void DeleteImage(int id);
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ImageService.Dtos
{
    public record ImageDto
    {
        public int Id { get; init; }
        public int ProudctId { get; init; }
        public string Message { get; init; }
        public DateTime CreateDate { get; set; }
    }
}

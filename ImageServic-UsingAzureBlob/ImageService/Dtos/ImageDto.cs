using Microsoft.AspNetCore.Http;
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
        public string Photo { get; set; }
        public DateTime CreateDate { get; set; }
    }
}

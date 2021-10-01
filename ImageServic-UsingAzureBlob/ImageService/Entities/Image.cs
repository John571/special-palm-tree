using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ImageService.Entities
{
    public record Image
    {
        public int Id { get; init; }
        public int ProudctId { get; init; }
        public string Message { get; init; }
        public string Photo { get; init; }
        public DateTime CreateDate { get; set; }
    }
}

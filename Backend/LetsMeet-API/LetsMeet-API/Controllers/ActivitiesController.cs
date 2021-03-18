using Application.Activities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace LetsMeet_API.Controllers
{
    public class ActivitiesController : BaseApiController
    {

        [HttpGet]
        public async Task<IActionResult> GetActivities()
        {
            return Ok(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id)
        {
            return Ok(await Mediator.Send(new Details.Query { Id = id}));
        }
    }
}

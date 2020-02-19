using System.Linq;
using AutoMapper;
using DatingApp.API.Models;
using DatingApp.API.ViewModel;

namespace DatingApp.API.Helper
{
    public class AutoMapperProfile: Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserForListViewModel>()
            .ForMember(dest => dest.PhotoUrl, 
            opt => opt.MapFrom(src => 
            src.Photos.FirstOrDefault(p => p.IsMain).Url))
            .ForMember(dest => dest.Age, opt => 
            opt.MapFrom(src => src.DateOfBirth.CalculateAge()));

            CreateMap<User, UserForDetailViewModel>()
            .ForMember(dest => dest.PhotoUrl, 
            opt => opt.MapFrom(src => 
            src.Photos.FirstOrDefault(p => p.IsMain).Url))
            .ForMember(dest => dest.Age, opt => 
            opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<Photo, PhotosForDetailedViewModel>();
            CreateMap<UserForUpdateViewModel, User>();
        }
    }
}
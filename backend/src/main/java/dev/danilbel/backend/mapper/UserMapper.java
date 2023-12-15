package dev.danilbel.backend.mapper;

import dev.danilbel.backend.dto.user.UserDto;
import dev.danilbel.backend.entity.UserEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {RoleMapper.class, ShippingAddressMapper.class})
public interface UserMapper {

    UserDto toDto(UserEntity userEntity);
}

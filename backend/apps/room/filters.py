from django_filters import rest_framework as filters


class RoomsIntFilter(filters.FilterSet):
    # is_visible = filters.BooleanFilter(field_name="is_visible")
    # category
    # room_type
    # floor
    # beds_num
    # price
    order = filters.OrderingFilter(
        fields=(
            "id",
            "category",
        )
    )


class RoomsExtFilter(filters.FilterSet):
    # category
    # room_type
    # floor
    # beds_num
    # price
    order = filters.OrderingFilter(
        fields=(
            "-price",
        )
    )
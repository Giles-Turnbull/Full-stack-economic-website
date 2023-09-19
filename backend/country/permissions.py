from rest_framework import permissions

# This permission class only allows authenticated users to access the endpoint
class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request
        if request.method in permissions.SAFE_METHODS: return True
        # Write permissions are only allowed to the owner of the object.
        return obj.user == request.user
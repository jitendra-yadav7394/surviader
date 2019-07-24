from graphene import Schema
from adult.models import Adult
from graphene_django.types import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphene import ObjectType
from graphene.relay import Node


class AdultNode(DjangoObjectType):

    class Meta:
        model = Adult
        interfaces = (Node,)
        filter_fields = {
            'id': ['exact'],
            'sex': ['icontains'],
            'race': ['icontains'],
            'relationship': ['icontains']
        }


class Query(ObjectType):
    adult = Node.Field(AdultNode)
    all_adults = DjangoFilterConnectionField(AdultNode)


schema = Schema(query=Query)

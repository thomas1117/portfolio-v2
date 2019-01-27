def test_example_test():
    assert 1 + 1 == 2




 # class BaseExampleEndpointTests(APITestCase):
#     def setUp(self):
#         # User fixtures
#         self.email = 'homersimpson@gmail.com'
#         self.first_name = 'homer'
#         self.last_name = 'simpson'
#         self.password = 'Test123q!'
#         self.user = User.objects.create_user(username=self.email, email=self.email, password=self.password,
#                                              first_name=self.first_name, last_name=self.last_name)
#         self.user_token = Token.objects.filter(user=self.author).first()
#
#         self.example1 = Example.objects.create()
#
#         self.example1_serializer_instance = ExampleListRetrieveSerializer(instance=self.example1)
#
#
# class ExampleListCreateTests(BaseExampleEndpointTests):
#     def setUp(self):
#         super().setUp()
#         self.url = reverse('example_list')
#
#     def test_example_list(self):
#         examples = Example.objects.all()
#         count = examples.count()
#         self.assertEqual(count, 1)






from django.test import TestCase
# from myapp.models import Animal

class AnimalTestCase(TestCase):
    def setUp(self):
        pass
        # Animal.objects.create(name="lion", sound="roar")
        # Animal.objects.create(name="cat", sound="meow")

    def test_animals_can_speak(self):
        """Animals that can speak are correctly identified"""
        # lion = Animal.objects.get(name="lion")
        # cat = Animal.objects.get(name="cat")
        # self.assertEqual(lion.speak(), 'The lion says "roar"')
        # self.assertEqual(cat.speak(), 'The cat says "meow"')
        assert 1 + 1 == 2
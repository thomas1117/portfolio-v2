from django.test import TestCase


class AnimalTestCase(TestCase):
    def setUp(self):
        pass

    def test_animals_can_speak(self):
        assert 1 + 1 == 2
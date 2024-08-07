"""
This module contains test cases for the CustomUser model.

The CustomUser model represents a custom user in the application.
It includes test cases to verify the creation of a user with the expected attributes,
as well as test cases to verify that a user is not created when an invalid value is provided.

Attributes:
    TestCase (type): The base test case class provided by Django.

Methods:
    setUp: Set up the test environment by creating a custom user.
    test_user_created: Test case to verify the creation of a user.
    test_user_not_created: Test case to verify that a user \
        is not created when an invalid value is provided.
"""

from django.test import TestCase

from .models import CustomUser


class CustomUserTestCase(TestCase):
    """
    Test case class for testing the CustomUser model.

    This test case class is used to test the creation and behavior of the CustomUser model.
    It includes test cases to verify the creation of a user with the expected attributes,
    as well as test cases to verify that a user is not created when an invalid value is provided.

    Attributes:
        TestCase (type): The base test case class provided by Django.

    Methods:
        setUp: Set up the test environment by creating a custom user.
        test_user_created: Test case to verify the creation of a user.
        test_user_not_created: Test case to verify that a user \
            is not created when an invalid value is provided.
    """

    def setUp(self) -> None:
        """
        Set up the test environment by creating a custom user.

        This method is called before each test case to prepare the necessary resources
        and set up the initial state for the tests.

        The custom user created has the following attributes:
        - username: "test"
        - email: "test@test.com"
        - password: "testpassword"
        - first_name: "test"
        - last_name: "test"
        """
        CustomUser.objects.create_user(
            username="test",
            email="test@test.com",
            password="testpassword",
            first_name="test",
            last_name="test",
        )

    def test_user_created(self) -> None:
        """
        Test case to verify the creation of a user.

        This test case checks if a user is created with the expected attributes:
        - Username: "test"
        - Email: "test@test.com"
        - First Name: "test"
        - Last Name: "test"
        - Password: "testpassword"
        - is_staff: False
        - is_superuser: False
        - is_active: True

        It also verifies that the string representation of the user is "test".
        """
        user: CustomUser = CustomUser.objects.get(username="test")
        self.assertEqual(user.email, "test@test.com")
        self.assertEqual(user.first_name, "test")
        self.assertEqual(user.last_name, "test")
        self.assertTrue(user.check_password("testpassword"))
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        self.assertTrue(user.is_active)
        self.assertEqual(str(user), "test")

    def test_user_not_created(self) -> None:
        """
        Test case to verify that a user is not created when an invalid value is provided.

        This test case verifies that when an invalid value is provided for creating a user,
        a `ValueError` exception is raised. In this case, we are trying to create a user
        with an invalid password. The `create_user` method of the `CustomUser` model should
        raise a `ValueError` when an invalid password is provided.

        This test uses the `assertRaises` context manager to assert that a `ValueError`
        exception is raised when the `create_user` method\
            is called with the provided invalid values.
        """
        with self.assertRaises(expected_exception=ValueError) as context:

            CustomUser.objects.create_user(
                username="test",
                email="test2@test.com",
                password="testpassword",
                first_name="test",
                last_name="test",
            )

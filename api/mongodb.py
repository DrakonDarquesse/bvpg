from decouple import config
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi


class MongoDB:

    def __init__(self, mongodb_uri: str) -> None:
        self.uri = mongodb_uri
        self._client = None
        # Create a new client and connect to the server

    def connect(self):
        if not self._client:
            self._client = MongoClient(self.uri, server_api=ServerApi('1'))

            # Send a ping to confirm a successful connection
            try:
                self._client.admin.command('ping')
                print("Pinged your deployment. You successfully connected to MongoDB!")

            except Exception as e:
                print(e)

    def get_collection(self, database: str, collection: str):
        if not self._client:
            self.connect()
        try:
            return self._client[database][collection]
        except:
            raise Exception("couldn't fetch collection")


mongodb_session = MongoDB(config('MONGODB_URI', cast=str))  # type: ignore

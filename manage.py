import os

from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager

from app.__init__ import app, db

app.config.from_json(os.getcwd() + "/config.json")

migrate = Migrate(app, db)
manager = Manager(app)

manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()

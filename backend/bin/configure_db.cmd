cd C:\PostgreSQL\10\bin 

echo "Configuring dragonstackdb"

dropdb -U node_user dragonstackdb
createdb -U node_user dragonstackdb

psql -U node_user dragonstackdb < C:\Users\razbi\Desktop\dragonstack\backend\bin\sql\account.sql
psql -U node_user dragonstackdb < C:\Users\razbi\Desktop\dragonstack\backend\bin\sql\generation.sql
psql -U node_user dragonstackdb < C:\Users\razbi\Desktop\dragonstack\backend\bin\sql\dragon.sql
psql -U node_user dragonstackdb < C:\Users\razbi\Desktop\dragonstack\backend\bin\sql\trait.sql
psql -U node_user dragonstackdb < C:\Users\razbi\Desktop\dragonstack\backend\bin\sql\dragonTrait.sql
psql -U node_user dragonstackdb < C:\Users\razbi\Desktop\dragonstack\backend\bin\sql\accountDragon.sql
psql -U node_user dragonstackdb < C:\Users\razbi\Desktop\dragonstack\backend\bin\sql\accountLikes.sql

cd C:\Users\razbi\Desktop\dragonstack\backend\bin
node ./insertTraits.js

echo "dragonstackdb configured"
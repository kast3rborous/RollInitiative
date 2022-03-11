# Database name
db_name=rollinitiative

# Backup storage directory 
backupfolder=~/postgresql/backups

# Notification email address 

# Number of days to store the backup 
keep_day=30

sqlfile=$backupfolder/all-database-$(date +%d-%m-%Y_%H-%M-%S).sql
zipfile=$backupfolder/all-database-$(date +%d-%m-%Y_%H-%M-%S).zip

#create backup folder
mkdir -p $backupfolder

# Create a backup

if export PGPASSWORD = 'BackDoor12'; pg_dump -U backup_user $db_name > $sqlfile ; then
   echo 'Sql dump created'
else
   echo 'pg_dump return non-zero code'
   exit
fi

# Compress backup 
if gzip -c $sqlfile > $zipfile; then
   echo 'The backup was successfully compressed'
else
   echo 'Error compressing backup'
   exit
fi

rm $sqlfile 
echo $zipfile

# Delete old backups 
find $backupfolder -mtime +$keep_day -delete
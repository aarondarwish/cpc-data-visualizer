for f in *.json
do
  curl -X PUT -H "Content-Type: application/json" -d "@$f" localhost:3000/campaign
  
  echo " <- $f"
done

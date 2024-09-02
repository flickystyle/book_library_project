start-frontend:
	make -C frontend start

start-api: 
	make -C api start

start:
	make start-api & make start-frontend
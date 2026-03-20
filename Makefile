.PHONY: help install dev build clean

help:
	@echo "Available commands:"
	@echo "  make install  - Install storefront dependencies"
	@echo "  make dev      - Start storefront dev server"
	@echo "  make build    - Build storefront for production"
	@echo "  make clean    - Remove node_modules and .next"

install:
	cd storefront && npm install

dev:
	cd storefront && npm run dev

build:
	cd storefront && npm run build

clean:
	rm -rf storefront/node_modules storefront/.next

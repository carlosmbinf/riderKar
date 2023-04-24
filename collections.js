import { Mongo } from '@meteorrn/core';

export const OnlineCollection = new Mongo.Collection('online');
export const MensajesCollection = new Mongo.Collection('mensajes');
export const LogsCollection = new Mongo.Collection('Logs');
export const PreciosCollection = new Mongo.Collection('precios');
export const VentasCollection = new Mongo.Collection('ventas');
export const VersionsCollection = new Mongo.Collection('versions');
export const TiendasCollection = new Mongo.Collection('tiendas');

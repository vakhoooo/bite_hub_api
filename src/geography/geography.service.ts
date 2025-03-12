import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GeographyService {
  async getAddress(address: string) {
    try {
      const response = await axios.get(
        `${process.env.YANDEX_GEOCODER_API_URL}?apikey=${process.env.YANDEX_GEOCODER_API_KEY}&geocode=${address}&format=json&kind=house`,
      );

      const res = response.data.response.GeoObjectCollection.featureMember.map(
        ({
          GeoObject: {
            name,
            description,
            Point: { pos },
          },
        }) => ({
          name,
          description,
          full: `${description} ${name}`,
          pos,
        }),
      );

      return res;
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }

  async getDeliveryPrice(
    routePoints: { city: string; country: string; fullname: string }[],
  ) {
    try {
      const headers = {
        authorization: `Bearer ${process.env.YANDEX_DELIVERY_TOKEN}`,
        'Accept-Language': 'ru',
      };

      const res = await axios.post(
        process.env.YANDEX_DELIVERY_URI +
          '/b2b/cargo/integration/v2/offers/calculate',
        { route_points: routePoints },
        { headers },
      );

      const offer = res.data.offers[0];

      if (!offer) {
        throw new InternalServerErrorException(
          'cannot find delivery option please try again later',
        );
      }

      const offerMap = {
        price: offer.price.total_price_with_vat,
        pickUp: offer.pickup_interval,
        delivery: offer.delivery_interval,
        ttl: offer.offer_ttl,
      };

      return offerMap;
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }

  createRoutePoints(restaurantAddress: string, userAddress: string) {
    return [
      {
        city: 'Краснодар',
        country: 'Россия',
        fullname: `Россия, Краснодар, ${restaurantAddress}`,
      },
      {
        city: 'Краснодар',
        country: 'Россия',
        fullname: `Россия, Краснодар, ${userAddress}`,
      },
    ];
  }
}

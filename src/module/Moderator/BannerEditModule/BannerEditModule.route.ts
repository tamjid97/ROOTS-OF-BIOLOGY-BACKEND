import express from 'express';
import { auth } from '../../../Middleware/auth';
import { BannerController } from './BannerEditModule.controller';

const router = express.Router();

router.get('/', BannerController.getAllBanners);

router.post('/', auth(), BannerController.createBanner);

router.put('/:id', auth(), BannerController.updateBanner);

router.delete('/:id', auth(), BannerController.deleteBanner);

export const BannerRoutes = router;
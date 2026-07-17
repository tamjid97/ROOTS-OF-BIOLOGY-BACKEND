import express from 'express';
import { auth } from '../../../Middleware/auth';
import { BannerController } from './BannerEditModule.controller';

const router = express.Router();

router.get('/', BannerController.getAllBanners);

router.post('/', auth('MODERATOR'), BannerController.createBanner);

router.put('/:id', auth('MODERATOR'), BannerController.updateBanner);

router.delete('/:id', auth('MODERATOR'), BannerController.deleteBanner);

export const BannerRoutes = router;
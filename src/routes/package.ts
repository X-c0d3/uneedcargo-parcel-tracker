// routes/package.ts
import express from 'express';
import { fetchPackageList, getAllTasks } from '../services/fetchPackage';
import { PackageItem } from '../types/PackageItem';

const router = express.Router();

router.get('/packages', async (req, res) => {
  try {
    const results: PackageItem[] = [];
    var allTasks = await getAllTasks('uneedcargo');
    for (const job of allTasks) {
      const res = await fetchPackageList(job, false);
      if (res && Array.isArray(res)) {
        results.push(...res);
      }
    }

    res.json({
      success: true,
      data: results,
      count: results?.length || 0,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

export default router;

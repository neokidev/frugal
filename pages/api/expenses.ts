import { getSession } from 'next-auth/react';
import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if user is authenticated
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized.' });
  }

  // Create new home
  if (req.method === 'POST') {
    try {
      const { date, amount, description } = req.body;

      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      const expense = await prisma.expense.create({
        data: {
          date: new Date(date),
          amount,
          description,
          userId: user.id,
        },
      });

      res.status(200).json(expense);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
  // HTTP method not supported!
  else {
    res.setHeader('Allow', ['POST']);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}

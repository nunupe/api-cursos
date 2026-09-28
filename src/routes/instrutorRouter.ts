import {Router, Request, Response} from 'express';
import prisma from "../prismaClient";

const router = Router()
router.get("/", async (req: Request, res: Response) => {
    try {
    const instrutores = await prisma.instrutor.findMany()
    res.json(instrutores)
    }catch (error) {
        res.status(500).json({error: "erro interno do servidor"})

    }
})


//busca instrutor por id

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const instrutores = await prisma.instrutor.findUnique({
            where:{id: Number(req.params.id)}
        })

        if(!instrutores) {
            return res.status(404).json ({error: "instrutor nao encontrado"})
        }
        res.json(instrutores)
    } catch (error) {
        res.status(500).json({error: "Erro interno dp servidor"})

    }
})

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        await prisma.instrutor.delete({
            where: {id: Number(req.params.id)}
        })
        return res.status(204).send()
    } catch (error) {
        res.status(500).json({ error: "erro interno do servidor"})
    }
})

router.post("/", async (req: Request, res: Response) => {
    const { nome, email, cursos } = req.body 

    if(!nome || !email){
        return res.status(400).json({error: "nome e email são obrigatórios"})
    }

    const instrutor = await prisma.instrutor.create({
        data: {nome, email}
    })

    res.status(201).json(instrutor)

})

router.put("/:id", async (req: Request, res: Response) => {
    try {
        const {titulo, description, completed } = req.body

        const instrutor = await prisma.instrutor.update({
            where: {id: Number(req.params.id) },
            data: {titulo, description, completed }
        })
         res.json(instrutor)
    }catch (error) {
        res.status(500).json({ error: "Erro interno do servidor"})
    }
})

export default router
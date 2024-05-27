import { db } from "@/db";
import { searchParamsCache } from "./_searchParams";
import {
  TableBody,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { role } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { Input } from "@/components/ui/input";
type PageProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};
export default async function Page({ searchParams }: PageProps) {
  const { limit } = searchParamsCache.parse(searchParams);
  const list = await db.query.role.findMany({
    limit,
  });
  return (
    <>
      <div className="flex w-full justify-end">
        <Link href="/role/create">
          <Button>Create</Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Role ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((r) => (
            <TableRow key={r.user_id}>
              <TableCell>{r.user_id}</TableCell>
              <TableCell>{r.name} 
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                <form
                    action={async () => {
                      "use server";
                      await db  
                        .update(role)
                        .set({ name: "Admin" })
                        .where(eq(role.user_id, r.user_id));
                      revalidatePath("/role");
                    }}
                  >
                    <Button variant="ghost" size="sm" type="submit">
                      Edit
                    </Button>
                  </form>
                  <form
                    action={async () => {
                      "use server";
                      await db.delete(role).where(eq(role.user_id, r.user_id));
                      revalidatePath("/role");
                    }}
                  >
                    <Button variant="destructive" size="sm" type="submit">
                      Delete
                    </Button>
                  </form>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

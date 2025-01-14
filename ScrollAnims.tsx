import { useEffect } from "react";

export function ScrollAnim(ref: any, classRemove: string, percentage: number) {
  useEffect(() => {
    const onScroll = () => {
      if (
        ref.current &&
        ref.current.classList.contains(classRemove) &&
        ref.current.offsetTop <=
          window.scrollY + window.innerHeight * (1 - percentage / 100)
      ) {
        ref.current.classList.remove(classRemove);
      }
    };
    if (ref.current && ref.current.classList.contains(classRemove)) {
      window.addEventListener("scroll", onScroll);
      onScroll();
    }
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref, classRemove, percentage]);
}

export function ScrollParent(
  ref: any,
  classRemove: string,
  percentage: number,
  delay: number
) {
  useEffect(() => {
    let timeouts: any[] = [];
    const onScroll = () => {
      if (
        ref.current?.firstChild &&
        ref.current.firstChild.offsetTop <=
          window.scrollY + window.innerHeight * (1 - percentage / 100)
      ) {
        timeouts.forEach(clearTimeout); // Clear previous timeouts
        Array.from(ref.current.children).forEach((el: any, idx) => {
          timeouts.push(
            setTimeout(
              () => el.classList.remove(classRemove),
              (idx + 1) * delay
            )
          );
        });
      }
    };
    window.addEventListener("scroll", onScroll);
    onScroll(); // Initial check
    return () => {
      window.removeEventListener("scroll", onScroll);
      timeouts.forEach(clearTimeout);
    };
  }, [ref, classRemove, percentage, delay]);
}

export function ScrollParentClassList(
  ref: any,
  classRemove: string[],
  percentage: number,
  delay: number
) {
  useEffect(() => {
    let timeouts: any[] = [];
    const onScroll = () => {
      if (
        ref.current?.firstChild &&
        classRemove.some((cls) =>
          ref.current.firstChild.classList.contains(cls)
        ) &&
        ref.current.offsetTop <=
          window.scrollY + window.innerHeight * (1 - percentage / 100)
      ) {
        timeouts.forEach(clearTimeout);
        Array.from(ref.current.children).forEach((el: any, idx) => {
          classRemove.forEach((cls) =>
            timeouts.push(
              setTimeout(() => el.classList.remove(cls), (idx + 1) * delay)
            )
          );
        });
      }
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      timeouts.forEach(clearTimeout);
    };
  }, [ref, classRemove, percentage, delay]);
}
